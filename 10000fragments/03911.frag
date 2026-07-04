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
        vec2 im = vec2(sin(t * 0.65 + jf * 4.0), cos(t * 0.14 * jf)) * 0.70;
        xs += sin(length(p - im) * 190.14 - t * 9.28 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.18;
	p = rot2(time * 0.51) * p;
	p += vec2(-0.45, 0.41) * sin(length(p) * 4.50 - time * 1.33) * 0.32;
	p = rot2(length(p) * -3.37 + time * 0.84) * p;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.63 + time * 0.23);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
