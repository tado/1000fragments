uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.42, 0.0)) * 18.36 - t * 1.70 + ph);
    float mb = sin(length(p + vec2(0.42, 0.0)) * 20.21 - t * 3.87 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.00), cos(time * 0.97)) * 0.10;
	float an = atan(p.y, p.x) + time * 0.55;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.33 / 3.1415927, 1.43 / r + time * 1.75);
	tv.x += tv.y * 0.42;
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.30, 0.28, 0.39), vec3(0.60, 0.81, 0.53), cc);
	col *= clamp(r * 2.23, 0.0, 1.0);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.36));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
