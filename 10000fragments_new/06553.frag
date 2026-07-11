uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 5; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.35 + jf * 4.0), cos(t * 0.23 * jf)) * 0.94;
        xs += sin(length(p - im) * 141.15 - t * 9.53 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.09;
	p.x += sin(p.y * 6.33 + time * 2.29) * 0.21;
	p = rot2(time * -0.64) * p;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 6.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.37), field(p, time, 0.74));
	col = 0.5 + 0.5 * col;
	col = mod(col * 1.71, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
