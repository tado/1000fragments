uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 4; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.34 + jf * 4.0), cos(t * 0.21 * jf)) * 0.69;
        xs += sin(length(p - im) * 162.63 - t * 7.57 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.25;
	p = fract(p * 2.50) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.71 + time * 0.15, vec3(0.57, 0.43, 0.46), vec3(0.32, 0.35, 0.41), vec3(1.22, 0.97, 1.17), vec3(0.48, 0.83, 0.86));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
