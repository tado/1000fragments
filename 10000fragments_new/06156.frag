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
    for(int xi = 1; xi < 8; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.83 + jf * 4.0), cos(t * 0.59 * jf)) * 0.97;
        xs += sin(length(p - im) * 208.38 - t * 11.24 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.x += sin(p.y * 3.01 + time * 3.25) * 0.35;
	{ float fr = length(p); p *= 1.0 + -0.64 * fr * fr; }
	p = rot2(length(p) * 1.70 + time * 1.33) * p;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.66 + time * 0.02);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
