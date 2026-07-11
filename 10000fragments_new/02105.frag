uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 8.53, t * 1.75 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 10.00 + t * 4.33 + ph) + sin(p.y * 17.07 - t * 2.48 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.63;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.80);
	float d = d1 + d2;
	vec3 col = palette(d * 0.59 + time * 0.23, vec3(0.59, 0.53, 0.58), vec3(0.49, 0.40, 0.35), vec3(1.12, 0.97, 1.39), vec3(0.73, 0.87, 0.24));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.76 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
