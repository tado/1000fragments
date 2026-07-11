uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 3.34 + vec2(t * 2.00, -t * 2.00) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 2.31 + t * 1.65 + ph) + sin(p.y * 6.66 - t * 1.65 + ph)
        + sin((p.x + p.y) * 11.56 + t * 1.65 + ph) + sin(length(p) * 16.79 - t * 1.65 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.67;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.51);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.69 + time * 0.06, vec3(0.49, 0.53, 0.59), vec3(0.45, 0.31, 0.43), vec3(1.16, 0.92, 1.25), vec3(0.89, 0.71, 0.68));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.45));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
