uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 6; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.34 + jf * 4.0), cos(t * 0.52 * jf)) * 0.87;
        xs += sin(length(p - im) * 202.95 - t * 12.48 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.98;
	p = rot2(time * 1.40) * p;
	p = rot2(length(p) * -2.08 + time * 0.62) * p;
	p = rot2(0.71) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.08 + time * 0.21, vec3(0.46, 0.47, 0.48), vec3(0.42, 0.35, 0.40), vec3(1.05, 0.70, 0.78), vec3(0.78, 0.13, 0.75));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
