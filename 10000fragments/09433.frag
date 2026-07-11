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
        vec2 im = vec2(sin(t * 0.97 + jf * 4.0), cos(t * 0.57 * jf)) * 0.81;
        xs += sin(length(p - im) * 177.27 - t * 12.79 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.08;
	p = rot2(time * -0.92) * p;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.91 + time * 0.09);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
