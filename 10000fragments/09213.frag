uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 7; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.24 + jf * 4.0), cos(t * 0.58 * jf)) * 0.33;
        xs += sin(length(p - im) * 61.83 - t * 12.72 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = abs(p) - 0.34;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.53 + time * 0.22, vec3(0.44, 0.53, 0.51), vec3(0.33, 0.44, 0.32), vec3(1.13, 0.96, 0.80), vec3(0.28, 0.65, 0.79));
	col = fract(col * 1.27);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
