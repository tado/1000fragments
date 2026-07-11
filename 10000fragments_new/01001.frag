uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.60, 0.0)) * 34.93 - t * 5.32 + ph);
    float mb = sin(length(p + vec2(0.60, 0.0)) * 31.80 - t * 3.46 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.70), cos(time * 0.58)) * 0.11;
	float an = atan(p.y, p.x) + time * -0.11;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.56 / 3.1415927, 1.15 / r + time * 2.87);
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 2.98 + time * 0.14);
	col *= clamp(r * 1.54, 0.0, 1.0);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.82));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
