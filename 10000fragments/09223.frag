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
    for(int xi = 1; xi < 7; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.37 + jf * 4.0), cos(t * 0.25 * jf)) * 0.87;
        xs += sin(length(p - im) * 66.86 - t * 8.46 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(length(p) * -2.22 + time * 0.80) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.32 + time * 0.18, vec3(0.56, 0.43, 0.60), vec3(0.49, 0.38, 0.50), vec3(1.26, 0.87, 1.24), vec3(0.14, 0.25, 0.22));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.30));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
