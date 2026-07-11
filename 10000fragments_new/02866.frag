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
        vec2 im = vec2(sin(t * 0.41 + jf * 4.0), cos(t * 0.18 * jf)) * 0.30;
        xs += sin(length(p - im) * 219.85 - t * 8.98 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y += sin(p.x * 5.04 + time * 1.06) * 0.32;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.66 + time * 0.18, vec3(0.51, 0.43, 0.59), vec3(0.37, 0.30, 0.36), vec3(1.13, 0.99, 1.31), vec3(0.13, 0.18, 0.52));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
