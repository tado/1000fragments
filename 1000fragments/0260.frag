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
        vec2 im = vec2(sin(t * 0.13 + jf * 4.0), cos(t * 0.56 * jf)) * 0.53;
        xs += sin(length(p - im) * 81.75 - t * 7.04 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.07;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.62 + time * 0.22, vec3(0.60, 0.45, 0.58), vec3(0.42, 0.39, 0.40), vec3(0.89, 1.11, 0.90), vec3(0.37, 0.72, 0.90));
	col = fract(col * 1.98);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
