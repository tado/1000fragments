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
    for(int xi = 1; xi < 9; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.80 + jf * 4.0), cos(t * 0.26 * jf)) * 0.93;
        xs += sin(length(p - im) * 68.78 - t * 4.83 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = abs(p);
	p = rot2(time * -0.61) * p;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.57 + time * 0.19);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
