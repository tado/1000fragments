uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 6; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.34 + jf * 4.0), cos(t * 0.43 * jf)) * 0.45;
        xs += sin(length(p - im) * 112.87 - t * 9.82 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.20;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.24 + time * 0.13, vec3(0.45, 0.56, 0.43), vec3(0.38, 0.34, 0.30), vec3(0.70, 1.39, 0.78), vec3(0.09, 0.14, 0.94));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
