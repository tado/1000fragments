uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 6.68 + t * 3.22 + ph) * 0.7;
    float wb = sin(p.y * 11.24 - t * 1.87 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.77;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.12;
	{ float iv = dot(p, p) + 0.05; p = p / iv * 0.41; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.49 + time * 0.04, vec3(0.41, 0.41, 0.40), vec3(0.46, 0.37, 0.39), vec3(0.98, 1.02, 1.33), vec3(0.88, 0.48, 0.19));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
