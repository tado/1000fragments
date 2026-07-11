uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 6; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.69 + jf * 4.0), cos(t * 0.19 * jf)) * 0.82;
        xs += sin(length(p - im) * 207.17 - t * 5.93 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.43;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.58 + time * 0.12, vec3(0.57, 0.53, 0.48), vec3(0.39, 0.40, 0.46), vec3(0.78, 0.92, 1.09), vec3(0.79, 0.98, 0.94));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
