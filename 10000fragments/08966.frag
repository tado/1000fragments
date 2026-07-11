uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 5; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.25 + jf * 4.0), cos(t * 0.52 * jf)) * 0.75;
        xs += sin(length(p - im) * 207.59 - t * 7.31 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.87 + time * 0.04, vec3(0.57, 0.42, 0.54), vec3(0.49, 0.44, 0.34), vec3(1.13, 1.34, 0.78), vec3(0.15, 0.97, 0.12));
	col = mod(col * 1.49, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
