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
        vec2 im = vec2(sin(t * 0.87 + jf * 4.0), cos(t * 0.31 * jf)) * 0.98;
        xs += sin(length(p - im) * 147.74 - t * 7.34 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p += vec2(0.01, -0.06) * sin(length(p) * 4.36 - time * 0.96) * 0.34;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 6.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = fract(p * 2.81) - 0.5;
	p = rot2(time * -0.80) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.95 + time * 0.07, vec3(0.54, 0.53, 0.53), vec3(0.39, 0.44, 0.34), vec3(0.86, 1.14, 1.39), vec3(0.11, 0.25, 0.53));
	col = clamp((col - 0.5) * 2.06 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
