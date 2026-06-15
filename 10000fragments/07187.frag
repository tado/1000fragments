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
    for(int xi = 1; xi < 4; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.17 + jf * 4.0), cos(t * 0.46 * jf)) * 0.34;
        xs += sin(length(p - im) * 117.05 - t * 11.63 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.67;
	p += vec2(0.99, -0.67) * sin(length(p) * 5.99 - time * 1.32) * 0.36;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.13; p = rot2(0.43) * p; }
	p = rot2(time * 1.06) * p;
	{ p = vec2(atan(p.y, p.x) * 2.48, length(p) * 3.75 - time * 0.59); }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.79 + time * 0.23);
	col = clamp((col - 0.5) * 1.93 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
