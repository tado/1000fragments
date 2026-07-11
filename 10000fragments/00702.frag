uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 9.49 + sin(p.y * 5.50 + t * 2.51) * 1.05 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.71;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.85 + time * 0.04, vec3(0.47, 0.48, 0.52), vec3(0.31, 0.35, 0.39), vec3(1.30, 0.94, 1.25), vec3(0.47, 0.42, 0.00));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
