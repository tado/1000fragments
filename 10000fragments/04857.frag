uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.50, 0.0)) * 13.34 - t * 4.36 + ph);
    float mb = sin(length(p + vec2(0.50, 0.0)) * 29.57 - t * 4.71 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.71), cos(time * 0.55)) * 0.18;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.50 / 3.1415927, 1.27 / r - time * 1.46);
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 3.02 + time * 0.58);
	col *= clamp(r * 1.53, 0.0, 1.0);
	col = mod(col * 2.48, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
