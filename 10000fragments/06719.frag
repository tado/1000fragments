uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.52, 0.0)) * 39.27 - t * 3.65 + ph);
    float mb = sin(length(p + vec2(0.52, 0.0)) * 8.22 - t * 6.79 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * 0.70;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.05 / 3.1415927, 0.61 / r + time * 1.93);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.83, 0.39, 0.98) * (0.17 / (abs(d) + 0.05));
	col = col / (1.0 + col);
	col *= clamp(r * 1.73, 0.0, 1.0);
	col = fract(col * 1.05);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
