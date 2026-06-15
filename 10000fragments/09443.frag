uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 8.46 + vec2(t * 1.55, -t * 1.55) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.17;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.46 + time * 0.18, vec3(0.53, 0.55, 0.48), vec3(0.45, 0.34, 0.34), vec3(1.29, 0.75, 0.91), vec3(0.30, 0.50, 0.14));
	col = mod(col * 1.55, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
