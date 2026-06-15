uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 17.00 + t * 5.87 + ph) + sin(p.y * 6.49 - t * 4.09 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 6; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.14 + jf * 4.0), cos(t * 0.59 * jf)) * 1.00;
        xs += sin(length(p - im) * 106.13 - t * 8.04 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(time * -1.27) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.70);
	float d = d1 * d2;
	vec3 col = palette(d * 0.51 + time * 0.26, vec3(0.41, 0.56, 0.45), vec3(0.47, 0.48, 0.37), vec3(1.39, 1.16, 0.97), vec3(0.90, 0.70, 0.79));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.65));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
