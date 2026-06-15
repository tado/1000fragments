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
        vec2 im = vec2(sin(t * 0.55 + jf * 4.0), cos(t * 0.29 * jf)) * 0.92;
        xs += sin(length(p - im) * 128.67 - t * 12.74 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p += vec2(-0.92, -0.79) * sin(length(p) * 5.44 - time * 0.53) * 0.38;
	p *= 2.40;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.59; p = rot2(2.28) * p; }
	p = rot2(p.y * 3.23 + time * 0.29) * p;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.93 + time * 0.10);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
