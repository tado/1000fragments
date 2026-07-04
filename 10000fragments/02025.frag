uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 hx = p * 5.39;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 18.30 - t * 2.33 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.48;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.41) * p * 14.38;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.64;
	float v = smoothstep(rad, rad - 0.09, length(hf));
	vec3 col = palette(d * 0.72 + time * 0.17, vec3(0.45, 0.59, 0.43), vec3(0.39, 0.48, 0.48), vec3(0.93, 0.77, 1.11), vec3(0.33, 0.20, 0.48)) * v;
	col = mod(col * 2.26, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
