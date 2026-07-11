uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 5; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.52 + jf * 4.0), cos(t * 0.44 * jf)) * 0.67;
        xs += sin(length(p - im) * 140.75 - t * 8.76 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.53;
	p = fract(p * 1.54) - 0.5;
	{ p = vec2(atan(p.y, p.x) * 1.78, length(p) * 2.12 - time * 0.76); }
	p = rot2(length(p) * 2.93 + time * 1.14) * p;
	p = rot2(p.y * 2.48 + time * 0.84) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.20, 0.55, 1.45) + vec3(0.18, 0.29, 0.23);
	col = clamp((col - 0.5) * 1.60 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
