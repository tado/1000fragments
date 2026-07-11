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
        vec2 im = vec2(sin(t * 0.90 + jf * 4.0), cos(t * 0.52 * jf)) * 0.81;
        xs += sin(length(p - im) * 183.19 - t * 10.53 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(p.y * -2.18 + time * 0.55) * p;
	{ float fr = length(p); p *= 1.0 + 0.47 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.62 + time * 0.03, vec3(0.56, 0.52, 0.54), vec3(0.40, 0.37, 0.38), vec3(1.26, 0.91, 1.01), vec3(0.44, 0.86, 0.26));
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
