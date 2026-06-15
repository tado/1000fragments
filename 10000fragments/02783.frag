uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 4.99, t * 0.75 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 2.01) - 0.5;
    float rad = 0.41 + 0.12 * sin(t * 0.99 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.47;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.14; p = rot2(0.32) * p; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.16);
	float d = d1 + d2;
	vec3 col = palette(d * 1.27 + time * 0.23, vec3(0.56, 0.49, 0.44), vec3(0.31, 0.42, 0.31), vec3(0.82, 0.91, 0.75), vec3(0.61, 0.16, 0.71));
	col = fract(col * 1.59);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
