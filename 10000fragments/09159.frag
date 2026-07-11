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
    for(int xi = 1; xi < 7; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.83 + jf * 4.0), cos(t * 0.54 * jf)) * 0.64;
        xs += sin(length(p - im) * 148.23 - t * 12.56 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.88;
	{ float fr = length(p); p *= 1.0 + -0.55 * fr * fr; }
	p += vec2(-0.99, -0.83) * sin(length(p) * 3.16 - time * 1.01) * 0.11;
	p = abs(p) - 0.47;
	p = rot2(length(p) * 1.56 + time * 1.17) * p;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.60 + time * 0.21);
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
