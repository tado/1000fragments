uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 8; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.29 + jf * 4.0), cos(t * 0.44 * jf)) * 0.66;
        xs += sin(length(p - im) * 124.48 - t * 8.27 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.98;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.58 + time * 0.11, vec3(0.42, 0.47, 0.48), vec3(0.45, 0.31, 0.41), vec3(0.97, 0.73, 1.28), vec3(0.16, 0.81, 0.85));
	col = mod(col * 2.60, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
