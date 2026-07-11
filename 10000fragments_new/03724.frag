uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.32 + 0.24 * sin(t * 0.56)) + vec2(-0.34, 0.14) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 20; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 20.0 * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 7.37, t * 2.26 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.63;
	p = rot2(1.34) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.72);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.86 + time * 0.22, vec3(0.47, 0.49, 0.56), vec3(0.43, 0.32, 0.42), vec3(0.99, 0.87, 1.31), vec3(0.04, 0.28, 0.18));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
