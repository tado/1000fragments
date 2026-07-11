uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 2.53) - 0.5;
    float rad = 0.41 + 0.12 * sin(t * 2.56 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.78;
	p.y += sin(p.x * 5.72 + time * 1.21) * 0.31;
	p = abs(p);
	p = rot2(p.y * -1.21 + time * 0.26) * p;
	p = (floor(p * 20.0) + 0.5) / 20.0;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.54, 0.57, 0.85) * (0.16 / (abs(d) + 0.07));
	col = col / (1.0 + col);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.11;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
