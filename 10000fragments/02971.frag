uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 7; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.77 + jf * 4.0), cos(t * 0.31 * jf)) * 0.30;
        xs += sin(length(p - im) * 205.99 - t * 7.18 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.77;
	p = fract(p * 1.07) - 0.5;
	{ p = vec2(atan(p.y, p.x) * 2.61, length(p) * 2.33 - time * 0.13); }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.75 + time * 0.10);
	col = clamp((col - 0.5) * 1.25 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
