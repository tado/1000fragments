uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 9; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.82 + jf * 4.0), cos(t * 0.31 * jf)) * 0.41;
        xs += sin(length(p - im) * 126.51 - t * 13.17 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.27;
	{ p = vec2(atan(p.y, p.x) * 1.49, length(p) * 2.31 - time * 0.57); }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 3.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = fract(p * 2.50) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.78 + time * 0.20, vec3(0.53, 0.56, 0.43), vec3(0.34, 0.33, 0.36), vec3(0.95, 1.30, 1.25), vec3(0.29, 0.39, 0.90));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
