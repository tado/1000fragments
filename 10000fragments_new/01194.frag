uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 hx = p * 5.51;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 22.20 - t * 4.13 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 5.73) - 0.5;
    float rad = 0.24 + 0.12 * sin(t * 1.15 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p.x += sin(p.y * 7.68 + time * 2.74) * 0.11;
	p = rot2(time * -0.94) * p;
	p = rot2(1.20) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.31);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.51 + time * 0.16, vec3(0.56, 0.54, 0.46), vec3(0.33, 0.41, 0.40), vec3(1.21, 0.79, 0.97), vec3(0.43, 0.48, 0.20));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
