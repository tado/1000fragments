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
        vec2 im = vec2(sin(t * 0.77 + jf * 4.0), cos(t * 0.11 * jf)) * 0.76;
        xs += sin(length(p - im) * 70.78 - t * 4.64 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.93;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.58 + time * 0.01, vec3(0.55, 0.56, 0.45), vec3(0.46, 0.38, 0.37), vec3(1.32, 0.97, 0.79), vec3(0.19, 0.28, 0.42));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
