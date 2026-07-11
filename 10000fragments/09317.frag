uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 6; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.62 + jf * 4.0), cos(t * 0.42 * jf)) * 0.61;
        xs += sin(length(p - im) * 138.43 - t * 5.61 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(p.y * 2.90 + time * 0.80) * p;
	{ p = vec2(atan(p.y, p.x) * 1.78, length(p) * 2.75 - time * 0.78); }
	p = rot2(0.56) * p;
	p = rot2(time * 0.20) * p;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.58 + time * 0.09);
	col = fract(col * 1.32);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
