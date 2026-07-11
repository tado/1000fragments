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
        vec2 im = vec2(sin(t * 0.38 + jf * 4.0), cos(t * 0.54 * jf)) * 0.83;
        xs += sin(length(p - im) * 148.78 - t * 8.97 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.08;
	{ float iv = dot(p, p) + 0.05; p = p / iv * 0.39; }
	p.x += sin(p.y * 3.10 + time * 3.65) * 0.21;
	p = rot2(p.y * -1.95 + time * 0.71) * p;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.53 + time * 0.02);
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
