uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.39 + 0.16 * cos(sa * 6.0 + t * 2.82 + ph);
    v = sin((sr - petal) * 13.73);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 17.97);
    float gsh = hash21(vec2(grow, floor(t * 3.89))) - 0.5;
    float gx = p.x + gsh * 0.57;
    v = sin(gx * 18.57 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 3.72));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p += vec2(-0.86, -0.02) * sin(length(p) * 2.72 - time * 1.76) * 0.33;
	p.x += sin(p.y * 6.41 + time * 1.46) * 0.24;
	p = sin(p * 1.43 + time * 0.91) * 1.44;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.55; p = rot2(0.75) * p; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.94);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.25 + time * 0.25, vec3(0.57, 0.50, 0.42), vec3(0.44, 0.35, 0.46), vec3(0.85, 1.05, 1.14), vec3(0.22, 0.53, 0.11));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
