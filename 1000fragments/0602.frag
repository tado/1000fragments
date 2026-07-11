uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 4.55 + vec2(t * 1.57, -t * 1.57) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.69;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.37 + time * 0.18, vec3(0.57, 0.58, 0.52), vec3(0.30, 0.41, 0.45), vec3(1.25, 1.31, 1.36), vec3(0.90, 0.01, 0.06));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.20));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
