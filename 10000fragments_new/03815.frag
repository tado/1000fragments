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
    for(int xi = 1; xi < 4; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.59 + jf * 4.0), cos(t * 0.46 * jf)) * 0.50;
        xs += sin(length(p - im) * 71.49 - t * 11.11 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ p = vec2(atan(p.y, p.x) * 2.22, length(p) * 5.53 - time * 0.80); }
	p += vec2(0.36, 0.11) * sin(length(p) * 4.60 - time * 1.44) * 0.13;
	p = rot2(1.81) * p;
	p *= 1.46;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.42 + time * 0.08, vec3(0.40, 0.42, 0.55), vec3(0.41, 0.44, 0.34), vec3(0.87, 0.71, 1.22), vec3(0.26, 0.53, 0.19));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.35 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
