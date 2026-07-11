uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 2.75, t * 0.98 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 2.40 + t * 1.65 + ph) + sin(p.y * 11.57 - t * 1.79 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.21;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.16; p = rot2(2.43) * p; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.40);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 1.73 + time * 0.12, vec3(0.54, 0.44, 0.50), vec3(0.37, 0.32, 0.40), vec3(0.82, 1.20, 0.81), vec3(0.07, 0.02, 0.51));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.47));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
