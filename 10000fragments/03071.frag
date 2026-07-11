uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 4.18 + vec2(t * 1.99, -t * 1.99) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.78 + time * 0.26, vec3(0.58, 0.50, 0.55), vec3(0.30, 0.31, 0.46), vec3(0.79, 0.72, 1.27), vec3(0.90, 0.66, 0.21));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
