uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 4.17 + vec2(t * 2.33, -t * 2.33) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.69 + time * 0.29, vec3(0.42, 0.41, 0.41), vec3(0.35, 0.32, 0.38), vec3(0.81, 0.75, 0.76), vec3(0.11, 0.75, 0.00));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
