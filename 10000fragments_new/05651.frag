uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 16.96 + t * 3.56 + ph) * 0.7;
    float wb = sin(p.y * 14.69 - t * 1.29 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.77;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.64 + time * 0.08, vec3(0.58, 0.59, 0.40), vec3(0.39, 0.33, 0.31), vec3(1.05, 1.02, 1.20), vec3(0.25, 0.44, 0.89));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
