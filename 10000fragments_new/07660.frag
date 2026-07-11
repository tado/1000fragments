uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 6.81 + sin(p.y * 2.68 + t * 2.39) * 3.72 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.95;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.22 + time * 0.12, vec3(0.57, 0.58, 0.59), vec3(0.49, 0.34, 0.44), vec3(1.03, 1.30, 1.18), vec3(0.08, 0.75, 0.18));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.74 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
