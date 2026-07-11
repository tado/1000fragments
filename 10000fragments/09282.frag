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
    for(int xi = 1; xi < 9; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.90 + jf * 4.0), cos(t * 0.38 * jf)) * 0.57;
        xs += sin(length(p - im) * 214.01 - t * 6.92 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(length(p) * -1.58 + time * 0.35) * p;
	p = rot2(1.31) * p;
	{ p = vec2(atan(p.y, p.x) * 1.99, length(p) * 4.09 - time * 0.34); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.58 + time * 0.09, vec3(0.45, 0.45, 0.42), vec3(0.45, 0.39, 0.50), vec3(0.98, 1.27, 0.84), vec3(0.87, 1.00, 0.40));
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
