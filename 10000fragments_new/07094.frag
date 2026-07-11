uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 hx = p * 6.88;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 22.10 - t * 3.76 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 37.54 - t * 8.90 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.90;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.58);
	float d = d1 * d2;
	vec3 col = palette(d * 0.74 + time * 0.22, vec3(0.54, 0.59, 0.56), vec3(0.43, 0.49, 0.38), vec3(1.14, 1.05, 1.36), vec3(0.22, 0.37, 0.51));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
