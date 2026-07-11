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
        vec2 im = vec2(sin(t * 0.71 + jf * 4.0), cos(t * 0.31 * jf)) * 0.57;
        xs += sin(length(p - im) * 81.74 - t * 10.91 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(time * -0.72) * p;
	{ float fr = length(p); p *= 1.0 + 0.26 * fr * fr; }
	p *= 2.08;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.78 + time * 0.22, vec3(0.43, 0.54, 0.51), vec3(0.47, 0.48, 0.30), vec3(0.91, 1.07, 1.27), vec3(0.37, 0.94, 0.49));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.97));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
