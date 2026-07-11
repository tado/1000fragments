uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.21, 0.0)) * 35.77 - t * 3.60 + ph);
    float mb = sin(length(p + vec2(0.21, 0.0)) * 8.76 - t * 3.45 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.31), cos(time * 1.46)) * 0.24;
	float an = atan(p.y, p.x) + time * -0.34;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.48 / 3.1415927, 0.66 / r + time * 2.92);
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.28, 0.30, 0.53), vec3(0.69, 0.85, 0.79), cc);
	col *= clamp(r * 2.60, 0.0, 1.0);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.97));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
