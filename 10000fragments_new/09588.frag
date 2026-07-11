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
    for(int xi = 1; xi < 5; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.95 + jf * 4.0), cos(t * 0.37 * jf)) * 0.63;
        xs += sin(length(p - im) * 139.08 - t * 4.04 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.53;
	p = rot2(time * -0.48) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.56, lr * 1.06 + time * -0.64); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.59 + time * 0.04, vec3(0.51, 0.50, 0.55), vec3(0.32, 0.42, 0.33), vec3(0.91, 0.90, 0.91), vec3(0.25, 0.24, 0.11));
	col = fract(col * 2.34);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
