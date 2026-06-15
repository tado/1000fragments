uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 6.31 + sr * 15.03 - t * 0.96 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 6; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.40 + jf * 4.0), cos(t * 0.18 * jf)) * 0.71;
        xs += sin(length(p - im) * 142.83 - t * 5.22 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.77;
	p = rot2(2.05) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.14);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.79 + time * 0.18, vec3(0.50, 0.45, 0.57), vec3(0.36, 0.49, 0.47), vec3(1.09, 1.18, 0.84), vec3(0.37, 0.71, 0.23));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.51));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
